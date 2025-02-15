import type { InputHTMLAttributes } from "react";
import { styled } from "styled-components";

import Typography from "@/components/common/Typography/Typography";

import color from "@/styles/color";

import Button from "../Button/Button";

type Props = {
  question: string;
  errorMessage?: string;
  onClickGuideButton?: () => void;
} & InputHTMLAttributes<HTMLTextAreaElement>;

const QuestionTextarea = ({ question, errorMessage, onClickGuideButton, ...props }: Props) => {
  return (
    <Layout>
      <Question>
        <Typography variant="h6">{question}</Typography>
        {onClickGuideButton && (
          <div>
            <Button variant="secondary" size="x-small" $block={false} onClick={onClickGuideButton}>
              가이드
            </Button>
          </div>
        )}
      </Question>
      <Separator />
      <Textarea placeholder="답변을 입력해 주세요." aria-label={`${question}, ${errorMessage ?? ""}`} {...props} />
      <ErrorMessageWrapper>
        <Typography variant="p2" color={color.red[200]} fontSize="14px">
          {errorMessage}
        </Typography>
      </ErrorMessageWrapper>
    </Layout>
  );
};

export default QuestionTextarea;

const Layout = styled.div`
  width: 100%;

  padding: 16px 30px 10px 30px;
  background-color: #fff;

  border: 1px solid #fff;
  border-radius: 14px;

  &:focus-within {
    border-color: ${color.blue[500]};
  }
`;

const Question = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  word-break: keep-all;

  h6 {
    min-height: 42px;

    flex: 1;
    display: flex;
    align-items: center;
  }

  button {
    font-weight: 700;
  }
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;

  margin: 16px 0;

  background-color: ${color.neutral[200]};
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 130px;

  resize: none;
  outline: none;
  border: none;
`;

const ErrorMessageWrapper = styled.div`
  height: 20px;
`;
