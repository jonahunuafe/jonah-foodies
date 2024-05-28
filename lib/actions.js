'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

export async function shareMeal(formData) {     /* To make sure it is actually server based you must add async to the function */
    const meal = {
        title: formData.get('title'),            /* Get the input with the name of title and so on and so forth */
        summary: formData.get('summary'),
        instructions: formData.get('instructions'), 
        image: formData.get('image'), 
        creator: formData.get('name'),
        creator_email: formData.get('email'),  
    }

    await saveMeal(meal);
    redirect('/meals')
}