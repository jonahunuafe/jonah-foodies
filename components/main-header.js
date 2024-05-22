import Link from "next/link";
import logoImg from "@/assets/logo.png"

export default function MainHeader() {
    return (
        <header>
            <Link href="/meals">
                <img src={logoImg.src} alt="A plate with food on it" />
                Royal Dining
            </Link>
            <nav>
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