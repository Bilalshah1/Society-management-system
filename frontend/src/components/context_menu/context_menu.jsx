import './context_menu.css'
import '../../assets/theme.css'



export function hideContext(setVal) {
  const handleClickOutsideEditRole = (e) => {
    if (!e.target.closest('.context-menu')) {
      setVal(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutsideEditRole);
  return () => {
    document.removeEventListener('mousedown', handleClickOutsideEditRole);
  };
};

;

export function onContextClick(e, setVal, setPos, x=0, y=0) {
  e.preventDefault();   
  const rect = e.target.getBoundingClientRect();
  setPos({ x: rect.x + 20 + x, y: rect.y + 10 + y });
  setVal(true);
}


export function ContextMenu({ position, show, options }) {

  if (!show)
    return <></>

  return (
    <div className="context-menu m-background" style={{ top: position.y + 'px', left: position.x + 'px' }}>
      {
        options.map(option => {
          return <div className="context-option" onClick={() => option.onClick()}>{option.name}</div>
        })
      }

    </div>
  )
}

 