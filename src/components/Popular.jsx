import React from 'react'
import ProjectCard from './ProjectCard'

const Popular = () => {

    const popular = [
        {
            id: 1,
            title: "Popular 1",
            description: "Popular Project Description",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            userid: "User1"
        },
        {
            id: 2,
            title: "Popular Project",
            description: "Popular Project Description",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            userid: "User2"
        },
        {
            id: 3,
            title: "Popular Project",
            description: "Popular Project Description",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            userid: "User3"
        }
    ]
    return (
        <div className="min-h-screen bg-black text-white selection:bg-green-500/30">

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <div className="flex flex-col space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                            Most <span className="text-green-500">Popular</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            Projects that create great Interactions !
                        </p>
                    </div>

                    <div className="flex flex-col space-y-6 mx-auto w-full">
                        {popular.map((popular) => (
                            <ProjectCard
                                key={popular.id}
                                userid={popular.userid}
                                title={popular.title}
                                description={popular.description}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Popular