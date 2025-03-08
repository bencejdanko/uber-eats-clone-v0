import { Link } from "react-router-dom";

import Hero from "/hero2.jpg";

import { Card, CardContent } from "@/components/ui/card";

function Home() {
    return (
        <div>
            <img
                src={Hero}
                alt="Hero"
                className="absolute -z-10 object-cover w-screen h-screen"
            />
            <div className="flex flex-col w-screen h-screen justify-center">
                <div className='pl-4'>
                    <div className="text-5xl font-bold max-w-xl">
                        Order San Jose<br />delivery near you
                    </div>
                    <Link to="/restaurants">
                        <div className='mt-4 bg-black text-white p-5 rounded-lg inline-block text-2xl'>Search Restaurants</div>
                    </Link>
                </div>
            </div>
            <div className='p-3'>
                <Card className='w-96'>
                    <CardContent className='flex flex-col gap-3'>
                        <img className='rounded-lg' src='/cook.jpg' alt='DishDash'/>
                        <div className='text-3xl'>Your restaurant, delivered.</div>
                        <Link to='restaurants/login'>Add your restaurant</Link>
                    </CardContent>

                </Card>
            </div>
        </div>
    );
}

export { Home };
