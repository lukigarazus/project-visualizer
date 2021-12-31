import { importedCaller } from "importoooo";
import ImportedModule from "imported-module";

function a() {
  return 2;
}
// function b() {
//   a();
// }
// const c = () => {
//   a();
// };
// (() => {
//   a();
// })();
class A {
  constructor() {
    a();
  }
  a() {
    a();
  }
  static c(a: any) {
    a();
  }
}
// const d = {
//   a() {
//     a();
//   },
//   b: () => {
//     a();
//   },
// };
// ({
//   a: () => {
//     a();
//   },
// });
// [].map(a);
// setTimeout(a, 0);
// A.c(a);
// importedCaller(a);
ImportedModule.a.a(a);
