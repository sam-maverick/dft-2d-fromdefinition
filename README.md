Implementation of the two-dimensional Discrete Fourier Transform (2D-DFT), and its inverse, from the definition.

# Installation

`npm install dft-2d-fromdefinition`



# Usage

```
const dft2ddef = require('dft-2d-fromdefinition');

let signal = [[[1,1],[2,0],[3,0]],[[4,4],[5,0],[6,0]]];
// corresponds to [[1+j,2,3],[4+4j,5,6]];

let transform = dft2ddef.dft(signal);



```



# Acknowledgements

The project that gave rise to these results received the support of a fellowship from ”la Caixa” Foundation (ID 100010434). The fellowship code is LCF/BQ/DI22/11940036. This work was also supported by FCT through the LASIGE Research Unit (UID/00408/2025).

# License

This work is licensed under CC BY 4.0. See [LICENSE](LICENSE) for more details.