'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text) {
    return !text || text.trim() === '';
}

export async function shareMeal(formData) {     /* To make sure it is actually server based you must add async to the function */
    const meal = {
        title: formData.get('title'),            /* Get the input with the name of title and so on and so forth */
        summary: formData.get('summary'),
        instructions: formData.get('instructions'), 
        image: formData.get('image'), 
        creator: formData.get('name'),
        creator_email: formData.get('email'),  
    }

    if(
        isInvalidText(meal.title) || 
        isInvalidText(meal.summary) || 
        isInvalidText(meal.instructions) || 
        isInvalidText(meal.creator) || 
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0
    ) {
        throw new Error('Invalid input')
    }

    await saveMeal(meal);
    redirect('/meals')
}