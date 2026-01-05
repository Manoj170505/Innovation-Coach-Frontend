import React from 'react'
import PersonalCard from './PersonalCard'
import { useState } from 'react'

const Projects = () => {

    const [visibility, setVisibility] = useState("public");
    const [search, setSearch] = useState("");

    const handleVisibility = (visibility) => {
        setVisibility(visibility);
    }

    const personal = [
        {
            id: 1,
            title: "Mern Stack",
            description: "Personal Project Description",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            visibility: "public"
        },
        {
            id: 2,
            title: "React Native",
            description: "Personal Project Description",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            visibility: "private"
        },
        {
            id: 3,
            title: "Flutter",
            description: "Personal Project Description",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            visibility: "private"
        },
        {
            id: 4,
            title: "NodeJs",
            description: "Personal Project Description",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            visibility: "public"
        },
        {
            id: 5,
            title: "Django",
            description: "Personal Project Description",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            visibility: "public"
        },
        {
            id: 6,
            title: "Laravel",
            description: "Personal Project Description",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            visibility: "public"
        },
    ]

    const filteredPersonal = personal.filter((personal) => personal.visibility === visibility);
    const filteredSearch = filteredPersonal.filter((personal) => personal.title.toLowerCase().includes(search.toLowerCase()));


    return (
        <div className="min-h-screen bg-black text-white selection:bg-green-500/30">

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <div className="flex flex-col space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                            Your <span className="text-green-500">Ideas</span>
                        </h1>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                            <div className="flex justify-center items-center bg-white/20 rounded-full w-fit">
                                <p onClick={() => handleVisibility("public")} className={visibility === "public" ? "bg-white text-green-500 py-3 px-6 rounded-full cursor-pointer transition-all" : "py-3 px-6 cursor-pointer"}>Public</p>
                                <p onClick={() => handleVisibility("private")} className={visibility === "private" ? "bg-white text-green-500 py-3 px-6 rounded-full cursor-pointer transition-all" : "py-3 px-6 cursor-pointer"}>Private</p>
                            </div>
                            <div className="flex bg-white/20 rounded-full w-full md:w-fit">
                                <input type="text" placeholder="Search" className="bg-transparent text-white focus:outline-none rounded-full py-3 px-6 w-full" onChange={(event) => setSearch(event.target.value)} />
                                <button onClick={() => setSearch(event.target.value)} className="bg-green-500 text-white py-3 px-6 rounded-full hover:bg-green-600 transition-colors"><i className="bi bi-search"></i></button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-6 mx-auto w-full">
                        {filteredSearch.map((personal) => (
                            <PersonalCard
                                key={personal.id}
                                id={personal.id}
                                title={personal.title}
                                description={personal.description}
                                details={personal.details}
                                visibility={personal.visibility}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Projects