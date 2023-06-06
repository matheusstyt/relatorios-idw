import { Blocks } from "react-loader-spinner"

export const Preloader = () => {
    return (
        <div className="modal-preloader">
            <Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
            />
        </div>
    )
}