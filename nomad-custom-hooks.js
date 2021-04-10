export const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    let willUpdate = true;

    if (typeof validator === 'function') {
      willUpdate = validator(value);
    }

    if (willUpdate) {
      setValue(value);
    }
  };

  return { value, onChange };
};

export const useTabs = (initialTab, allTabs) => {
  if (!allTabs || !Array.isArray(allTabs)) return;

  const [currentIndex, setCurrentIndex] = useState(initialTab);

  return { currentItem: allTabs[currentIndex], changeItem: setCurrentIndex };
};

export const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};

export const useClick = (onClick) => {
  if (typeof onClick !== 'function') {
    return;
  }

  const element = useRef();

  useEffect(() => {
    if (element.current) {
      element.current.addEventListener('click', onClick);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener('click', onClick);
      }
    };
  }, []);
  return element;
};

export const useClick = (onClick) => {
  if (typeof onClick !== 'function') {
    return;
  }

  const element = useRef();

  useEffect(() => {
    if (element.current) {
      element.current.addEventListener('mouseenter', onClick);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener('mouseenter', onClick);
      }
    };
  }, []);
  return element;
};

export const useConfirm = (message, onConfirm, onCancel) => {
  if (typeof onConfirm !== 'function') {
    return;
  }

  if (onCancel && typeof onCancel !== 'funciton') {
    return;
  }

  const confirmAction = () => {
    if (confirm(message)) {
      onConfirm();
    } else {
      onCancel && onCancel();
    }
  };

  return confirmAction;
};

export const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = '';
  };

  const enablePrevent = () => window.addEventListener('beforeunload', listener);
  const disablePrevent = () => window.removeEventListener('beforeunload', listener);

  return { enablePrevent, disablePrevent };
};

export const useBeforeLeave = (onBefore) => {
  if (typeof onBefore !== 'function') return;
  const handle = (event) => {
    const { clientY } = event;
    if (clientY <= 0) {
      onBefore();
    }
  };
  useEffect(() => {
    document.addEventListener('mouseleave', handle);
    return () => document.removeEventListener('mouseleave', handle);
  }, []);
};