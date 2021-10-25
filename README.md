# string-of-timestamp-differences
Given two java datetime stamps return a string that shows the differences in years, months, days, hour, minutes, seconds, milliseconds. You can pass in unit string arrays to accomidate different languages.


Returns a string representing the time difference between two dates rounded to the unit precision. 
Test here: onecompiler.com/javascript or jsfiddle.net/
- Parameters:
  - **start**, **end** - end is optional and defaults to now(). Allow java date objects or properly formated, as dates, strings (i.e. "2021-10-20T14:35:46.217Z").
  - **pUnits** (optional) - an array of stings that represent the plural unit words. 
      This also controls the precision desired. 
      The order needs to be: ['years','months','days','hours','minutes','seconds','milliseconds'].
      Omitting units from the end of the array will omit from the duration
      and round up to that last unit.
  - **sUnits** (optional) - as above but singular of units. Note array length and
      order should be the same as pUnits.
  - **separator** (optional) - separator string of units in the returned string. Default is ', '
  - **otherFills** (optional) - array that holds the final suffix. 
      Default is ['ago','until','less than']
