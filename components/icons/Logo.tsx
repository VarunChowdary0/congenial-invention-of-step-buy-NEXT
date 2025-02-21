import React from 'react'

interface Props {
    h : number;
    w : number;
}
const Logo:React.FC<Props> = ({h,w}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0.6339118480682373 0.7759113311767578 385.6352844238281 447.1919250488281" 
    width={w} height={h}>
        <path fill="#000000" d="&#10;  M 230.40 58.45&#10;  C 228.84 57.50 225.87 55.92 223.62 55.19&#10;  Q 207.87 50.07 190.74 45.37&#10;  A 0.65 0.65 0.0 0 1 190.42 44.32&#10;  Q 193.62 40.50 199.04 37.51&#10;  Q 216.65 27.77 236.57 30.69&#10;  A 1.02 1.02 0.0 0 0 237.73 29.82&#10;  L 239.59 16.22&#10;  A 2.09 2.06 25.0 0 0 238.91 14.39&#10;  C 237.61 13.22 236.57 12.27 235.95 10.72&#10;  C 233.14 3.69 241.23 -1.89 247.23 2.12&#10;  Q 250.56 4.34 250.23 8.43&#10;  Q 249.86 13.13 245.10 15.35&#10;  Q 244.54 15.61 244.45 16.22&#10;  L 242.49 30.55&#10;  A 1.31 1.31 0.0 0 0 243.49 32.00&#10;  C 260.26 35.83 276.63 47.78 281.66 64.80&#10;  A 0.38 0.38 0.0 0 1 281.20 65.27&#10;  Q 278.29 64.51 276.61 64.21&#10;  C 268.29 62.71 260.46 69.57 262.01 78.33&#10;  C 263.44 86.44 275.26 92.41 281.56 85.20&#10;  Q 283.62 82.86 283.80 85.97&#10;  C 283.93 88.09 283.33 92.00 282.14 93.91&#10;  Q 278.16 100.23 269.68 98.59&#10;  Q 249.65 94.70 224.94 90.22&#10;  C 212.52 87.97 200.79 85.50 184.93 82.44&#10;  C 179.19 81.33 174.96 77.41 176.02 71.07&#10;  Q 177.20 64.06 183.05 53.69&#10;  C 184.22 51.61 185.14 51.71 187.14 52.10&#10;  Q 198.10 54.28 210.99 58.02&#10;  A 0.57 0.56 26.5 0 1 211.29 58.90&#10;  Q 207.91 63.40 209.08 68.77&#10;  C 210.16 73.76 215.43 78.03 220.34 78.16&#10;  Q 226.34 78.32 229.99 73.62&#10;  A 0.48 0.47 -64.8 0 0 229.72 72.86&#10;  C 221.60 71.10 223.27 61.43 230.20 59.74&#10;  Q 231.85 59.34 230.40 58.45&#10;  Z"/>
        <path fill="#000000" d="&#10;  M 158.79 231.58&#10;  Q 221.38 249.28 224.57 250.19&#10;  C 228.89 251.43 233.28 253.11 231.13 258.88&#10;  Q 228.78 265.19 222.84 266.60&#10;  Q 220.18 267.23 214.44 265.56&#10;  C 193.76 259.55 171.19 253.04 148.72 248.09&#10;  C 140.97 246.38 139.81 241.08 137.31 233.23&#10;  C 129.62 209.05 120.23 180.96 111.31 153.14&#10;  Q 91.12 90.23 85.29 73.74&#10;  Q 84.83 72.43 82.17 71.92&#10;  Q 68.23 69.26 58.98 66.69&#10;  C 51.74 64.68 49.33 56.89 54.32 51.51&#10;  Q 58.00 47.55 64.73 49.03&#10;  Q 69.22 50.02 81.84 53.01&#10;  C 92.39 55.51 99.55 56.78 102.66 66.83&#10;  Q 107.60 82.78 113.99 102.02&#10;  Q 115.54 106.68 122.01 126.79&#10;  Q 139.20 180.20 149.93 211.64&#10;  A 1.62 1.61 -12.2 0 0 151.64 212.73&#10;  L 258.70 201.38&#10;  A 3.09 3.08 -78.4 0 0 261.06 199.82&#10;  C 272.86 178.66 282.32 159.24 296.13 131.69&#10;  A 0.55 0.54 17.9 0 0 295.73 130.91&#10;  Q 287.15 129.62 277.43 127.80&#10;  Q 240.65 120.90 221.13 117.65&#10;  Q 212.02 116.13 201.42 114.18&#10;  Q 167.55 107.96 130.81 101.70&#10;  C 125.07 100.72 119.55 95.13 121.45 88.99&#10;  C 122.87 84.43 128.31 82.26 132.75 83.02&#10;  Q 138.82 84.06 155.16 87.18&#10;  Q 165.65 89.18 174.81 90.81&#10;  Q 274.32 108.50 308.91 114.95&#10;  C 313.18 115.74 317.33 119.22 318.39 123.55&#10;  Q 319.36 127.52 317.15 131.89&#10;  Q 297.31 171.06 277.45 209.96&#10;  C 274.04 216.63 270.08 217.88 262.42 218.77&#10;  C 231.59 222.35 194.98 225.89 158.92 229.91&#10;  Q 154.59 230.40 158.79 231.58&#10;  Z"/>
        <path fill="#000000" d="&#10;  M 284.44 81.19&#10;  A 0.81 0.81 0.0 0 1 283.66 82.03&#10;  L 283.34 82.04&#10;  A 5.85 5.75 -2.1 0 1 277.28 76.51&#10;  L 277.28 76.49&#10;  A 5.85 5.75 -2.1 0 1 282.92 70.53&#10;  L 283.24 70.52&#10;  A 0.81 0.81 0.0 0 1 284.08 71.30&#10;  L 284.44 81.19&#10;  Z"/>
        <path fill="#000000" d="&#10;  M 212.00 195.20&#10;  Q 178.23 198.91 168.21 199.63&#10;  Q 160.41 200.18 156.79 194.81&#10;  Q 155.77 193.31 152.83 184.31&#10;  Q 143.24 155.03 133.46 125.79&#10;  C 132.73 123.60 131.99 119.88 133.23 117.58&#10;  C 136.63 111.30 143.80 114.18 149.19 115.11&#10;  Q 153.48 115.86 180.95 121.10&#10;  Q 230.90 130.63 267.36 136.67&#10;  Q 273.35 137.66 275.64 142.60&#10;  C 276.77 145.05 274.57 149.97 273.24 152.48&#10;  Q 257.31 182.56 256.94 183.21&#10;  C 254.34 187.74 251.69 191.30 246.02 191.83&#10;  Q 222.19 194.08 212.00 195.20&#10;  Z"/>
        <path fill="#000000" d="&#10;  M 89.90 302.11&#10;  A 0.95 0.94 48.0 0 0 89.83 303.57&#10;  Q 90.77 304.43 93.42 305.92&#10;  C 119.19 320.41 148.86 332.38 176.89 342.18&#10;  A 1.93 1.92 -73.7 0 1 178.13 344.45&#10;  Q 177.63 346.48 175.65 347.66&#10;  Q 167.32 352.59 165.77 353.23&#10;  Q 164.67 353.68 162.20 352.86&#10;  Q 113.95 336.83 72.38 312.34&#10;  Q 69.64 310.72 67.82 309.23&#10;  C 60.66 303.35 64.98 296.71 71.54 293.53&#10;  C 79.55 289.63 90.24 284.29 99.33 280.45&#10;  Q 121.54 271.09 141.70 260.69&#10;  C 145.28 258.85 147.55 259.45 152.06 260.20&#10;  Q 160.03 261.53 167.03 264.34&#10;  A 0.65 0.65 0.0 0 1 167.04 265.54&#10;  Q 162.92 267.33 154.29 271.63&#10;  Q 151.81 272.86 137.07 280.22&#10;  C 123.25 287.12 109.15 293.04 95.29 299.24&#10;  Q 91.54 300.92 89.90 302.11&#10;  Z"/>
        <path fill="#40a3ed" d="&#10;  M 295.71 303.80&#10;  Q 297.10 302.97 295.66 302.23&#10;  Q 276.63 292.42 255.54 283.25&#10;  Q 243.44 277.98 233.79 273.37&#10;  A 0.29 0.29 0.0 0 1 233.77 272.85&#10;  Q 239.80 269.35 244.23 263.98&#10;  A 1.41 1.40 27.9 0 1 245.72 263.53&#10;  Q 248.68 264.45 251.63 265.66&#10;  Q 281.91 278.04 309.88 292.40&#10;  C 312.78 293.89 319.55 297.59 320.50 300.97&#10;  Q 321.69 305.23 317.64 308.71&#10;  Q 313.62 312.16 307.30 316.06&#10;  C 286.80 328.70 263.74 342.77 240.36 354.60&#10;  C 229.40 360.14 218.76 363.70 206.51 362.57&#10;  Q 193.70 361.38 181.94 357.83&#10;  Q 179.97 357.24 181.82 356.34&#10;  Q 188.70 353.00 194.33 348.27&#10;  Q 194.99 347.71 195.85 347.86&#10;  Q 200.33 348.60 205.11 349.23&#10;  C 212.49 350.21 218.61 348.02 225.97 344.19&#10;  Q 254.71 329.24 282.89 312.16&#10;  C 287.62 309.29 291.69 306.21 295.71 303.80&#10;  Z"/>
        <path fill="#40a3ed" d="&#10;  M 176.57 330.75&#10;  Q 153.89 322.93 125.37 309.14&#10;  C 123.01 308.00 119.68 305.75 121.21 302.70&#10;  Q 122.28 300.57 124.84 299.33&#10;  Q 149.29 287.43 183.72 270.23&#10;  Q 187.79 268.20 192.95 269.59&#10;  Q 201.68 271.94 207.14 274.12&#10;  Q 232.43 284.21 257.04 294.23&#10;  C 259.76 295.33 265.20 297.31 266.80 299.65&#10;  C 269.42 303.49 265.62 307.16 261.91 309.45&#10;  Q 240.79 322.47 220.09 333.57&#10;  C 215.82 335.86 211.62 338.22 206.96 338.24&#10;  Q 201.30 338.27 199.12 337.73&#10;  Q 190.69 335.61 176.57 330.75&#10;  Z"/>
    </svg>
  )
}

export default Logo