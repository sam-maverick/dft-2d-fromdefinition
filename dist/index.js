'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.dft = dft;
exports.idft = idft;
const utils_1 = require("./utils");
/**
 * This function calculates the 2D-DFT of a real or imaginary signal, from the definition of the DFT.
 * @param signal Array of values of the 2D signal in the spacial domain, in cartesian format:
 * signal[][][0] is the real part and signal[][][1] is the imaginary part.
 * It is assumed that the array is a matrix, i.e., signal[x].length is always the same.
 * @returns The DFT of signal, in the same format.
 */
function dft(signal) {
    const M = signal.length;
    const N = signal[0].length;
    let transform = Array.from({ length: M }, () => {
        return Array.from({ length: N }, () => {
            return [0, 0];
        });
    });
    for (let u = 0; u < M; u++) {
        for (let v = 0; v < N; v++) {
            let sum = [0, 0];
            for (let x = 0; x < M; x++) {
                for (let y = 0; y < N; y++) {
                    sum = (0, utils_1.add)(sum, (0, utils_1.multiply)(signal[x][y], (0, utils_1.exponential)(-utils_1.TWO_PI * ((u * x / M) + (v * y / N)))));
                }
            }
            transform[u][v] = (0, utils_1.multiply)([(1 / (M * N)), 0], sum);
        }
    }
    return transform;
}
/**
 * This function calculates the inverse 2D-DFT, from the definition of the inverse DFT.
 * @param transform Array of values of the 2D transform in the frequency domain, in cartesian format:
 * transform[][][0] is the real part and transform[][][1] is the imaginary part.
 * It is assumed that the array is a matrix, i.e., transform[u].length is always the same.
 * @returns The inverse DFT, in the same format.
 */
function idft(transform) {
    const M = transform.length;
    const N = transform[0].length;
    let signal = Array.from({ length: M }, () => {
        return Array.from({ length: N }, () => {
            return [0, 0];
        });
    });
    for (let x = 0; x < M; x++) {
        for (let y = 0; y < N; y++) {
            let sum = [0, 0];
            for (let u = 0; u < M; u++) {
                for (let v = 0; v < N; v++) {
                    sum = (0, utils_1.add)(sum, (0, utils_1.multiply)(transform[u][v], (0, utils_1.exponential)(utils_1.TWO_PI * ((u * x / M) + (v * y / N)))));
                }
            }
            signal[x][y] = sum;
        }
    }
    return signal;
}
