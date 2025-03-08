function NavigationFooter() {
    return (
        <div className='grid grid-cols-2 p-10'>
            <div className='text-xl font-bold'>Restaurants San Jose</div>
            <div className='flex flex-col gap-2'>
                <a href="/restaurants/signup">Add your restaurant</a>

            </div>
        </div>
    );
}

export { NavigationFooter };