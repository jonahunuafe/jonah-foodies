import { Suspense } from "react";
import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";

export const metadata = {
    title: 'All Meals',
    description: 'Browse the delicious meals shared by our vibrant community',
};

async function Meals() {
    const meals = await getMeals();       /* We get our meals here without normal fetching and useEffect hook */
    return <MealsGrid meals={meals} />
}


export default function MealsPage() {
    return (    
        <>
            <header className={classes.header}>
                <h1>
                    Delicious Meal Created 
                    <span className={classes.highlight}> by Jonah</span>
                </h1>
                <p>
                    Choose your favourite recipe and cook it yourself. It is easy and fun
                </p>
                <p className={classes.cta}>
                    <Link href="/meals/share">
                        Share Your Favourite Recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={ <p className={classes.loading}>Fetching Meals...</p> }>
                    <Meals />
                </Suspense>
            </main>
        </>
    )
}