// In the design system artifact React comes from window.React (see the DS react.ts).
// On the site it comes from npm. This is the only file that differs from the DS sources.
import React from 'react';
export default React;
export { useState, useEffect, useRef, useCallback } from 'react';
