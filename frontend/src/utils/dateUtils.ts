export default function timeAgo(isoDate: string) {
  if (!isoDate) return 'unknown date';
  
  const now = new Date();
  const past = new Date(isoDate);
  
  // Check if date is invalid
  if (isNaN(past.getTime())) {
    return 'unknown date';
  }
  
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 0) {
    return 'just now'; // handle future dates
  }
  
  if (seconds < 60) {
    return seconds === 0 ? 'just now' : `${seconds} seconds ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 2) {
    return `a minute ago`;
  }

  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 2) {
    return `an hour ago`;
  }
  if (hours < 24) {
    return `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 2) {
    return `yesterday`;
  }
  if (days < 7) {
    return `${days} days ago`;
  } 

  const weeks = Math.floor(days / 7);
  if (weeks < 2) {
    return `a week ago`;
  }
  if (weeks < 4) {
    return `${weeks} weeks ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 2) {
    return `a month ago`;
  }
  if (months < 12) {
    return `${months} months ago`;
  }

  const years = Math.floor(days / 365);
  if (years < 2) {
    return `a year ago`;
  } 
  if (years >= 2) {
    return `${years} years ago`;
  }

  return 'listing date unknown';
}
