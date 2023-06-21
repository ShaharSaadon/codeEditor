import React, { useEffect, useState } from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export function ConfettiFeature({ isSolutionCorrect }) {
    const { width, height } = useWindowSize()
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (isSolutionCorrect) {
            setShowConfetti(true);
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 7000); // 10 seconds

            // Clear timeout on component unmount
            return () => clearTimeout(timer);
        }
    }, [isSolutionCorrect]);


    return (
        <>
            {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                />
            )}
        </>
    )
}