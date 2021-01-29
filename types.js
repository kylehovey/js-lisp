const typeOfClass = ([__class]) => __type => ({
  [__type]: props => ({ __class, __type, ...props }),
});

module.exports = {
  ...typeOfClass`structure`('expression'),
  ...typeOfClass`atom`('number'),
  ...typeOfClass`atom`('cons'),
  ...typeOfClass`atom`('string'),
  ...typeOfClass`atom`('symbol'),
  ...typeOfClass`atom`('boolean'),
  ...typeOfClass`atom`('operator'),
  ...typeOfClass`atom`('lambda'),
  ...typeOfClass`atom`('definition'),
  ...typeOfClass`atom`('void'),
  ...typeOfClass`reference`('variable'),
};
