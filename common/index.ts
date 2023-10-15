export const whiteTextFieldCss = {
  color: 'black',
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'black',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#666',
      borderRadius: '10px',
    },
    '&:hover fieldset': {
      borderColor: '#666',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#666',
    },
  },
  input: {
    color: '#666',
    '&::placeholder': {
      color: '#666',
      opacity: 0.8,
    },
  },
};
