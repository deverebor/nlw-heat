import ReactLoading from 'react-loading';

import styles from './styles.module.scss'

export function Preloader() {

  return(
    <div className={styles.spinStyle}>
      <ReactLoading type={"spin"} color={"#c00"} height={'20%'} width={'20%'}  />
    </div>
    
  )
}