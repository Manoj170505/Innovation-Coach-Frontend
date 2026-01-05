import React from 'react'

const Learnmore = ({ onClose }) => {
    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/80 backdrop-blur-[6px] z-100 animate-in fade-in duration-500">
                <div className="relative w-full max-w-[440px] bg-[#1a1a1a]/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] overflow-hidden animate-in slide-in-from-bottom-8 duration-700">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors duration-300">
                        <i className="bi bi-x-lg"></i>
                    </button>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">Hi There,</h2>
                        <p className="text-white/80 mb-6">
                            Welcome to Innovative Coach — where creativity meets collaboration!
                            Our platform empowers students, innovators, and developers to share their unique project ideas with a growing community of thinkers and creators.
                            Whether you’re looking for inspiration, feedback, or potential teammates, Innovative Coach connects you with like-minded individuals ready to bring ideas to life.
                            Discover trending innovations, explore creative concepts, and contribute your own projects to inspire others.
                            Each idea shared here is a stepping stone toward real-world innovation and problem-solving.
                            We believe every great project starts with a simple idea — and the right guidance to make it shine.
                            Join us in shaping the future of innovation, one project at a time.
                            Let’s build, learn, and grow together with Innovative Coach!
                        </p>
                        <button
                            onClick={onClose}
                            className="group relative w-full bg-[#08a045] hover:bg-[#08a045]/90 text-white font-bold py-4 rounded-2xl shadow-xl shadow-[#08a045]/20 active:scale-[0.98] transition-all duration-300 mt-2 overflow-hidden">
                            <div className="flex items-center justify-center gap-2 transition-transform duration-300">
                                <span className="text-sm uppercase tracking-widest">Get Started</span>
                                <i className="bi bi-arrow-right"></i>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Learnmore