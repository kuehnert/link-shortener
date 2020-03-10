import React from "react";
import BigMessage from "./BigMessage";

const Loading: React.FC = () => {
  // const term = useCurrentTerm();
  // const students = useCurrentStudents();
  // const course = useCurrentCourse();
  // const enrolments = useCurrentEnrolments();

  return (
    <BigMessage title="Loading…">
      {process.env.NODE_ENV === "development" && (
        <div>
          {/* <Typography>
            term {term == null ? "null" : `${term.id} ${term.name}`}
          </Typography>

          <Typography>
            course {course == null ? "null" : `${course.id} ${course.name}`}
          </Typography>

          <Typography>
            students{" "}
            {students == null ? "null" : Object.values(students).length}
          </Typography>

          <Typography>
            enrolments{" "}
            {enrolments == null ? "null" : Object.values(enrolments).length}
          </Typography> */}
        </div>
      )}
    </BigMessage>
  );
};
export default Loading;
