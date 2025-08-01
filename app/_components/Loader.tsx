import React from 'react'

export default function Loader() {
    return (
        <div className="text-center">
            <div
                className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
            ></div>
            <h2 className="text-zinc-900 dark:text-white mt-4">Carregando...</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
                Os produtos estão sendo carregados, por favor aguarde.
            </p>
        </div>
    )
}
