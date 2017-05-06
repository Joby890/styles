const assert = require('chai').assert;
const { map } = require("../utils");
const { styles, css } = require("../styles");

const testStylesObj = {
  key1: {
    option1: "value2",
    option2: "value4",
  },
  key2: {
    option3: "value3",
    option4: "value5",
  },
}

const testFinishedStylesObj = {
  key1: () => {
    return {
      option1: "value2",
      option2: "value4",
    };
  }, 
  key2: () => {
    return {
      option3: "value3",
      option4: "value5",
    }
  },
}
describe("styles", () => {
  describe("styles func", () => {
    it("should accept an object as input", () => {
      assert.typeOf(styles({}), "object");
    });
    it("should map values to be all functions", () => {
      const result  = styles(testStylesObj);
      map(result, (val) => {
        assert.typeOf(val, "function");
      });
      assert.lengthOf(Object.keys(result), 2);
    });
    it("should not modify the function if function is value", () => {
      const tFunc = () => {return {}};
      const result = styles({key1: tFunc});
      assert.equal(result.key1, tFunc);
    });
    it("should have the same result when object is provided", () => {
      const result = styles(testStylesObj);
      map(result, (val, key) => {
        assert.deepEqual(testStylesObj[key], val());
      });
      assert.lengthOf(Object.keys(result), 2);
    });
    
  });
  describe("css", () => {
    it("should merge array of objects", () => {
      const result = css(testFinishedStylesObj.key1, testFinishedStylesObj.key2);
      assert.deepEqual(result.option1, "value2");
      assert.deepEqual(result.option2, "value4");
      assert.deepEqual(result.option3, "value3");
      assert.deepEqual(result.option4, "value5");
    });

    it("should handle function not return an object", () => {
      const tFunc = () => {};
      const styleR = styles({key1: tFunc});
      const result = css(styleR.key1);
      assert.deepEqual({}, result);
    });
  })
});