import React, {useEffect} from 'react';


const DEFAULT_STATUS = {
  color: '#000',
  label: '',
};

const STATUS_STRENGTH = {
  Weak: {
    color: '#ff6900',
    label: 'Débil',
  },
  Fair: {
    color: '#f2cf1f',
    label: 'Justa',
  },
  Good: {
    color: '#14eb6e',
    label: 'Buena',
  },
  Strong: {
    color: '#00ff6b',
    label: 'Fuerte',
  },
};

const PasswordStrength = ({password, actions}) => {
  const testedResult = password;
  const createPasswordLabel = () => {
    let score = 0;
    let regexPositive = ['[A-Z]', '[a-z]', '[0-9]', '\\W'];
    regexPositive.forEach((regex, index) => {
      if (new RegExp(regex).test(testedResult)) {
        score += 1;
      }
    });
    switch (score) {
      case 0:
        return {
          value: 0,
          info: '',
        };
      case 1:
        return {
          value: 0.25,
          info: 'Weak',
        };
      case 2:
        return {
          value: 0.5,
          info: 'Fair',
        };
      case 3:
        return {
          value: 0.75,
          info: 'Good',
        };
      case 4:
        return {
          value: 1,
          info: 'Strong',
        };
      default:
        return {
            value: 0,
            info: '',
        };
    }
  };

  useEffect(() => {
    actions(createPasswordLabel().info);
  }, [password]);

  let status = STATUS_STRENGTH[createPasswordLabel().info] || DEFAULT_STATUS;

  return (
    <>
      <p className='' style={{
        color: STATUS_STRENGTH[createPasswordLabel().info]?.color
      }} >{status.label}</p>
    </>
  );
};

export default PasswordStrength;
