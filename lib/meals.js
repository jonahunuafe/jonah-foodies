import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

// const sql = require('better-sqlite3');

const db = sql('meals.db');

export async function getMeals() {
    /* This is not a normal thing to do */
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // throw new Error('Loading meals failed...')
    /* Select all columns from  the meals table */
    return db.prepare('SELECT * FROM meals').all()
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);  /* to avoid sequel injection */
}

export async function saveMeal(meal) {
    /* forces all characters to be lower case */
    meal.slug = slugify(meal.title, {lower: true}); 
    /* To protect against cross scripting attacks */
    meal.instructions = xss(meal.instructions);   

    /* From here below is for the image */
    const extension = meal.image.name.split('.').pop(); 
    const fileName = `${meal.slug}.${extension}`

    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error) {
            throw new Error('Saving image failed!')
        }
    });

    // Storing image in database, just storing only the path.
    // We used @ to prevent sequel injection.
    meal.image = `/images/${fileName}`

    db.prepare(`
        INSERT INTO meals 
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);
}