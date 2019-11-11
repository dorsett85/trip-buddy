let timeout: any;

/**
 * Debouncing function
 *
 * @param   {function()} callback Function after debouncing timeout, takes no arguments
 * @param   {number}     delay    Callback delay in milliseconds
 * @returns {void}
 */
export function debounce(callback: TimerHandler, delay: number) {
  clearTimeout(timeout);
  timeout = setTimeout(callback, delay);
}