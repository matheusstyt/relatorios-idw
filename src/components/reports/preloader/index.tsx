import { Blocks, Grid } from "react-loader-spinner"

export const Preloader = () => {
    return (
        <div className="modal-preloader">
            {/* <Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
            /> */}
            <Grid
                height="80"
                width="80"
                color="#1289DC"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}