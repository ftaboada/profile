import React, { useState, useEffect, useCallback, useRef, FC } from 'react'
import produce from 'immer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@components/UI'
import style from '@styles/GameOfLife.module.scss'
import { useMode } from 'ctx'

const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
]

export const GameOfLife: FC<{ time?: number }> = ({ time = 30 }) => {
    const generateEmptyGrid = () => {
        const rows = []
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0))
        }

        return rows as (0 | 1)[][]
    }
    const [dimensions, setDimensions] = useState({ numRows: 14, numCols: 18 })
    const { numRows, numCols } = dimensions
    const [size, setSize] = useState(12)
    const [running, setRunning] = useState(false)
    const [grid, setGrid] = useState<(0 | 1)[][]>(generateEmptyGrid())
    const { darkMode } = useMode()

    useEffect(() => {
        const rows = []
        for (let i = 0; i < numRows; i++) {
            rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.64 ? 1 : 0))
            )
        }
        setGrid(rows)
    }, [])
    const runningRef = useRef(running)
    runningRef.current = running

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return
        }

        setGrid((g) => {
            return produce(g, (gridCopy) => {
                for (let i = 0; i < numRows; i++) {
                    for (let k = 0; k < numCols; k++) {
                        let neighbors = 0
                        operations.forEach(([x, y]) => {
                            const newI = i + x
                            const newK = k + y
                            if (
                                newI >= 0 &&
                                newI < numRows &&
                                newK >= 0 &&
                                newK < numCols
                            ) {
                                neighbors += g[newI][newK]
                            }
                        })
                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][k] = 0
                        } else if (g[i][k] === 0 && neighbors === 3) {
                            gridCopy[i][k] = 1
                        }
                    }
                }
            })
        })

        setTimeout(runSimulation, time)
    }, [])

    return (
        <div className={style.container}>
            <div className={style.buttons}>
                <Button
                    onClick={() => {
                        setRunning(!running)
                        if (!running) {
                            runningRef.current = true
                            runSimulation()
                        }
                    }}
                    Icon={
                        running
                            ? () => <FontAwesomeIcon icon={faStopCircle} />
                            : () => <FontAwesomeIcon icon={faPlayCircle} />
                    }
                    size="sm"
                />
                <Button
                    onClick={() => {
                        setGrid(generateEmptyGrid())
                    }}
                    innerText="limpar"
                    size="sm"
                    variant="transparent"
                />
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${numCols}, ${size}px)`,
                }}
            >
                {grid.map((rows, i) =>
                    rows.map((col, k) => (
                        <div
                            className="cell"
                            key={`${i}-${k}`}
                            onClick={() => {
                                const newGrid = produce(grid, (gridCopy) => {
                                    gridCopy[i][k] = grid[i][k] ? 0 : 1
                                })
                                setGrid(newGrid)
                            }}
                            style={{
                                width: `${size}px`,
                                height: `${size}px`,
                                backgroundColor: grid[i][k]
                                    ? darkMode
                                        ? 'rgb(209, 47, 47)'
                                        : 'rgb(64, 111, 212)'
                                    : undefined,
                                border: `solid 1px ${
                                    darkMode
                                        ? 'rgba(255,255,255,0.1)'
                                        : 'rgba(0,0,0,0.05)'
                                }`,
                            }}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
