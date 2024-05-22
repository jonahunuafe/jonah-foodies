import Link from "next/link";
import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";

export default function MainHeader() {
    return (
        <header className={classes.header}>
            <Link href="/meals" className={classes.logo}>
                <img src={logoImg.src} alt="A plate with food on it" />
                Royal Dining
            </Link>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <Link href="/meals">Browse Food</Link>
                    </li>
                    <li>
                        <Link href="/community">Foodies Community</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}