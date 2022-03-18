import React from "react";
import ImageLoading from '../Imagenes/loading1.gif';
import Style from './Loading.module.css'


export default function Loading({setLoading}){
    return(
        <div>
             <div>
             <div className={Style.loadingDiv}>
                <p className={Style.loading}>Loading...</p>
            <div>
                <img src={ImageLoading} className={Style.imgLoad} alt=''/>
            </div>                                
            </div>
      <div>
        {setTimeout(() => {
          setLoading(false);
        }, 25000)}
      </div>
    </div>
        </div>

    )
}