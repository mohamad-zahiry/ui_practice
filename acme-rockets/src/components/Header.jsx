import { useState } from "react"
import { getImageUrl } from "../utils"

const Header = () => {
    const defaultTheme = "dark"

    // name: use for localStorage key:value
    // nextTheme: point to next theme on toggle
    const toggleTheme = {
        dark: { nextTheme: "light", name: "dark", icon: getImageUrl("sun.png"), alt: "sun logo" },
        light: { nextTheme: "dark", name: "light", icon: getImageUrl("moon.png"), alt: "moon logo" },
    }

    let userPreferredTheme = localStorage.getItem("theme")
    if (Object.keys(toggleTheme).indexOf(userPreferredTheme) == -1) {
        userPreferredTheme = defaultTheme
    }

    const [theme, setTheme] = useState(toggleTheme[userPreferredTheme])
    if (theme == toggleTheme.dark) document.documentElement.classList.add("dark")

    const toggleDarkMode = () => {
        setTheme((cur) => {
            localStorage.setItem("theme", toggleTheme[cur.nextTheme].name)
            return toggleTheme[cur.nextTheme]
        })

        document.documentElement.classList.toggle("dark")
    }

    const toggleMenu = (e) => {
        e.preventDefault()
        const mobileMenu = document.getElementById("mobile-menu")
        const menuTop = document.getElementById("menu-top")
        const menuMid = document.getElementById("menu-mid")
        const menuBot = document.getElementById("menu-bot")

        mobileMenu.classList.toggle("hidden")
        mobileMenu.classList.toggle("flex")

        menuTop.classList.toggle("toggle-btn-top")
        menuMid.classList.toggle("toggle-btn-mid")
        menuBot.classList.toggle("toggle-btn-bot")
    }

    return (
        <header className="sticky top-0 z-10 bg-teal-700 text-white">
            <section className="mx-auto flex max-w-6xl items-center justify-between p-4">
                <h1 className="flex items-center justify-start text-3xl font-medium">
                    <a href="">🚀 Acme Rockets</a>

                    <button onClick={toggleDarkMode}>
                        <img
                            src={theme.icon}
                            alt={theme.alt}
                            className="ml-4 w-6 scale-125 rounded-full p-1 hover:bg-white hover:bg-opacity-30"
                        />
                    </button>
                </h1>
                <div>
                    <button id="hamburger-btn" onClick={toggleMenu} className="relative h-9 w-9  text-4xl md:hidden">
                        <div id="menu-top" className="absolute right-0 top-1 h-1 w-9 rounded-full bg-white transition-all"></div>
                        <div id="menu-mid" className="absolute right-0 top-4 h-1 w-9 rounded-full bg-white transition-all "></div>
                        <div id="menu-bot" className="absolute right-0 top-7 h-1 w-9 rounded-full bg-white transition-all"></div>
                    </button>

                    <nav className="hidden flex-row-reverse justify-end gap-x-8 text-xl md:flex" aria-label="header">
                        <a href="#rockets" className="hover:opacity-90">
                            Our Rockets
                        </a>
                        <a href="#testimonials" className="hover:opacity-90">
                            Testimonials
                        </a>
                        <a href="#contact" className="hover:opacity-90">
                            Contact Us
                        </a>
                    </nav>
                </div>
            </section>

            {/* mobile menu: start */}
            <section
                id="mobile-menu"
                className="absolute top-[68px] hidden h-screen w-screen animate-[open-menu_0.3s_cubic-bezier(.39,.3,.34,1.31)] flex-col items-start justify-start bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-50"
                onClick={() => {
                    const mobileMenu = document.getElementById("mobile-menu")
                    mobileMenu.classList.toggle("hidden")
                    mobileMenu.classList.toggle("flex")
                }}
            >
                <nav className="flex w-full flex-col items-center justify-center gap-y-8 pt-8 text-4xl" aria-label="mobile">
                    <a href="#hero" className="hover:opacity-90">
                        Home
                    </a>
                    <a href="#rockets" className="hover:opacity-90">
                        Our Rockets
                    </a>
                    <a href="#testimonials" className="hover:opacity-90">
                        Testimonials
                    </a>
                    <a href="#contact" className="hover:opacity-90">
                        Contact Us
                    </a>
                    <a href="#footer" className="hover:opacity-90">
                        Legal
                    </a>
                </nav>
            </section>
            {/* mobile menu: end */}
        </header>
    )
}

export default Header
