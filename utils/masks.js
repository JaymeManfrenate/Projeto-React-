export const maskPhone = (value) => {
  if (!value) return '';
  
  value = value.replace(/\D/g, '');
  
  if (value.length > 11) {
    value = value.substring(0, 11);
  }

  if (value.length <= 10) {
    value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else {
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  return value;
};

export const maskDate = (value) => {
  if (!value) return '';
  
  value = value.replace(/\D/g, '');
  
  if (value.length > 8) {
    value = value.substring(0, 8);
  }

  if (value.length > 4) {
    value = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
  } else if (value.length > 2) {
    value = value.replace(/(\d{2})(\d{2})/, '$1/$2/');
  }

  return value;
};