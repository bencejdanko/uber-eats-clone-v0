import Banner from "/banner.svg";

function NavigationFooter() {
    return (
        <div className="grid grid-cols-2 p-10 items-center">
            <img src={Banner} alt="Banner" className="h-36" />
            <div className="flex flex-col gap-2">
                <a href="/">Explore Restaurants</a>
                <a href="/restaurants/signup">Add your restaurant</a>
            </div>
        </div>
    );
}

export { NavigationFooter };
