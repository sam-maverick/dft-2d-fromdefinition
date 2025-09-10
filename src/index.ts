'use strict';

import { add, multiply, exponential, TWO_PI } from './utils';

type Convention = 'unnormalized_forward' | 'normalized_forward' | 'symmetric';

/**
 * This function calculates the 2D-DFT of a real or imaginary signal, from the definition of the DFT.
 * @param signal Array of values of the 2D signal in the spacial domain, in cartesian format:
 * signal[][][0] is the real part and signal[][][1] is the imaginary part.
 * It is assumed that the array is a matrix, i.e., signal[x].length is always the same.
 * @returns The DFT of signal, in the same format.
 */
export function dft(signal: number[][][], convention: Convention) {

  const M = signal.length;
  const N = signal[0].length;

  let norm_factor = 1;
  switch(convention) {
    case 'unnormalized_forward': norm_factor = 1;
      break;
    case 'normalized_forward': norm_factor = (1/(M*N));
      break;
    case 'symmetric': norm_factor = (1/Math.sqrt(M*N));
      break;
  };

  let transform = Array.from({ length: M }, () => {
    return Array.from({ length: N }, () => {
      return [0,0];
    });
  });

  for (let u=0; u<M; u++) {
    for (let v=0; v<N; v++) {

      let sum = [0,0];
      for (let x=0; x<M; x++) {
        for (let y=0; y<N; y++) {
          sum = add ( sum, multiply ( signal[x][y], exponential ( -TWO_PI * ( (u*x/M) + (v*y/N) ) ) ) ) ;
        }
      }
      transform[u][v] = multiply([norm_factor,0], sum);

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
export function idft(transform: number[][][], convention: Convention) {

  const M = transform.length;
  const N = transform[0].length;

  let inorm_factor = 1;
  switch(convention) {
    case 'unnormalized_forward': inorm_factor = (1/(M*N));
      break;
    case 'normalized_forward': inorm_factor = 1;
      break;
    case 'symmetric': inorm_factor = (1/Math.sqrt(M*N));
      break;
  };


  let signal = Array.from({ length: M }, () => {
    return Array.from({ length: N }, () => {
      return [0,0];
    });
  });

  for (let x=0; x<M; x++) {
    for (let y=0; y<N; y++) {

      let sum = [0,0];
      for (let u=0; u<M; u++) {
        for (let v=0; v<N; v++) {
          sum = add ( sum, multiply ( transform[u][v], exponential ( TWO_PI * ( (u*x/M) + (v*y/N) ) ) ) ) ;
        }
      }
      signal[x][y] = multiply([inorm_factor,0], sum);

    }
  }

  return signal;

}

