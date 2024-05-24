const sql = require('better-sqlite3');

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000)); /* This is not a normal thing to do */
    return db.prepare('SELECT * FROM meals').all()  /* Select all columns from  the meals table */
}