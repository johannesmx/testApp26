import { useState, useEffect } from 'react'

interface NumberSet {
    factor: number
    multiplicand: number
}
export function useNumbers( level:number ) {
    let mlimit:number = level * 10
    
    const generateRandom = ( limit:number ) => {
        return Math.floor( Math.random() * limit )
    }

    const createNumberSet = () => {
        return { factor: generateRandom(100), multiplicand: generateRandom(mlimit)}
    }

    return{
        createNumberSet
    }
        
    
}