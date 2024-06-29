import {
  Heading,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import QuestionBtn from "../_components/QuestionBtn";

interface Props {
  testDuration: number;
}

const QuestionLegendGrid = () => {
  return (
    <div className="flex flex-col m-2">
      <div className="flex justify-start items-center gap-2">
        <span className="h-8">
          <QuestionBtn count={1} status={0} />
        </span>
        <Text>You have not visited the question yet.</Text>
      </div>
      <div className="flex justify-start items-center gap-2">
        <span className="h-8">
          <QuestionBtn count={2} status={1} />
        </span>
        <Text>You have NOT answered the question.</Text>
      </div>
      <div className="flex justify-start items-center gap-2">
        <span className="h-8">
          <QuestionBtn count={3} status={2} />
        </span>
        <Text>You have answered the question.</Text>
      </div>
      <div className="flex justify-start items-center gap-2">
        <span className="h-8">
          <QuestionBtn count={4} status={3} />
        </span>
        <Text>
          You have NOT answered the question, but have marked the question for
          review.
        </Text>
      </div>
      <div className="flex justify-start items-center gap-2">
        <span className="h-8">
          <QuestionBtn count={5} status={4} />
        </span>
        <Text>
          You have answered the question AND have marked the question for
          review.
        </Text>
      </div>
    </div>
  );
};

const GeneralInstructions = (props: Props) => {
  return (
    <>
      <OrderedList>
        <ListItem>
          <Text>
            The duration of the examination is{" "}
            <strong>{props.testDuration}</strong> minute
            {props.testDuration === 1 ? "" : "s"}. The countdown timer at the
            top right-hand corner of your screen displays the time available for
            you to complete the examination.
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            When the timer reaches zero, the examination will end automatically.
            You will not be required to submit your examination.
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            The Question Palette displayed on the right-hand side of the screen
            shows the status of each question using one of the following
            symbols:
          </Text>
          <QuestionLegendGrid />
          <UnorderedList>
            <ListItem>
              <Text>
                The Marked for Review status for a question simply indicates
                that you would like to look at that question again.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                The question(s) &quot;Answered&quot; and &quot;Answered and
                Marked for Review&quot; will be considered for evaluation.
              </Text>
            </ListItem>
          </UnorderedList>
        </ListItem>
        <br />
        <Heading size={"md"}>Navigating to a Question:</Heading>
        <ListItem>
          <Text>To answer a question, do the following:</Text>
          <OrderedList listStyleType={"lower-alpha"}>
            <ListItem>
              <Text>
                Click on the question number in the Question Palette at the
                right of your screen to go to that numbered question directly.
                Note that using this option does NOT save your answer to the
                current question.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Click on <strong>Save & Next</strong> to save your answer for
                the current question and then go to the next question.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Click on <strong>Mark for Review & Next</strong> to save your
                answer for the current question, mark it for review, and then go
                to the next question.
              </Text>
            </ListItem>
          </OrderedList>
        </ListItem>
        <br />
        <Heading size={"md"}>Answering a Question:</Heading>
        <ListItem>
          <Text>Procedure for answering a multiple choice type question:</Text>
          <OrderedList listStyleType={"lower-alpha"}>
            <ListItem>
              <Text>
                To select your answer, click on the button of one of the
                options.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                To deselect your chosen answer, click on the button of the
                chosen option again or click on the{" "}
                <strong>Clear Response</strong> button.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                To change your chosen answer, click on the button of another
                option.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                To save your answer, you MUST click on the{" "}
                <strong>Save & Next</strong> button.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                To mark the question for review, click on the{" "}
                <strong>Mark for Review & Next</strong> button.
              </Text>
            </ListItem>
          </OrderedList>
        </ListItem>
        <ListItem>
          <Text>
            To change your answer to a question that has already been answered,
            first select that question for answering and then follow the
            procedure for answering that type of question.
          </Text>
        </ListItem>
        <br />
        <Heading size={"md"}>Navigating through sections:</Heading>
        <ListItem>
          <Text>
            Sections in this question paper are displayed on the top bar of the
            screen. Questions in a section can be viewed by clicking on the
            section name. The section you are currently viewing is highlighted.
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            After clicking the Save & Next button on the last question for a
            section, you will automatically be taken to the first question of
            the next section.
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            You can shuffle between sections and questions anytime during the
            examination as per your convenience only during the time stipulated.
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            You can view the corresponding section summary as part of the legend
            that appears in every section above the question palette.{" "}
          </Text>
        </ListItem>
      </OrderedList>
    </>
  );
};

export default GeneralInstructions;
