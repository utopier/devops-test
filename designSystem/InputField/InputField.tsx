/* eslint-disable */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

type InputFieldProps = {
    className?: string
    /** input placeholder 텍스트 */
    placeholder?: string;
    /** input type */
    type: string;
    /** input value */
    value?: string;
    /** input onChange Function */
    onChange?: (e:any) => void;
}

/** InputField는 Todo Input Field로 사용됨. */
const InputField = ({className,type, placeholder, value, onChange}:InputFieldProps) => {
    return (
        <input
            className={className}
            css={style}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )
};

InputField.defaultProps = {
    type: 'text'
}

const style = css`
    border-radius: 5px;
    width: 180px;
    height: 30px;
`

export default InputField;