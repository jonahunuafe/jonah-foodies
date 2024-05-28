const sql = require('better-sqlite3');
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000)); /* This is not a normal thing to do */

    // throw new Error('Loading meals failed...')
    return db.prepare('SELECT * FROM meals').all()  /* Select all columns from  the meals table */
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);  /* to avoid sequel injection */
}

export function saveMeal(meal) {
    meal.slug = slugify(meal.title, {lower: true});       /* forces all characters to be lower case */
    meal.instructions = xss(meal.instructions);     /* To protect against cross scripting attacks */
}