import { sessionStorageUtil } from "./storageUtils";
const storagekey = "scrollPosition";
export function startScrollTracking() {
  window.onbeforeunload = () => {
    sessionStorageUtil.save(storagekey, window.scrollY);
  };
}

export function scrollToPosition() {
  const scrollPosition = sessionStorageUtil.load<number>(storagekey);
  if (scrollPosition) {
    //awaiting for images to load
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
      sessionStorageUtil.remove(storagekey);
    }, 300);
  }
}
