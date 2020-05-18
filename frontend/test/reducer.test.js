import reducer from "../src/reducers/class.reducer";
import { CLASS_GET_STUDENTS } from "../src/constants/actionTypes";

describe("class reducer", () => {
  it("should handle CLASS_GET_STUDENTS", () => {
    expect(
      reducer({}, {
        type: CLASS_GET_STUDENTS,
        payload: {
          "students": [
            {
              "name": "Test student",
              "energy": 100,
              "growth": 0,
              "teacher_id": "classapp.teacher(1,)",
              "class_ids": "classapp.class(25,)",
            }
          ]
        }
      })
    ).toEqual({
      "students": [
        {
          "name": "Test student",
          "energy": 100,
          "growth": 0,
          "teacher_id": "classapp.teacher(1,)",
          "class_ids": "classapp.class(25,)",
        }
      ],
      "activeStudent": {
        "name": "Test student",
        "energy": 100,
        "growth": 0,
        "teacher_id": "classapp.teacher(1,)",
        "class_ids": "classapp.class(25,)",
      }
    })
  })
})