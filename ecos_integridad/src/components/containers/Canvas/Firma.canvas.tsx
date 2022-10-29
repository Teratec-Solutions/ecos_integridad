import SignatureCanvas from 'react-signature-canvas'

const FirmaCanvas = ({setRefCanvas}: {setRefCanvas: (ref: SignatureCanvas | null) => void}) => {
    return (
        <div
            style={
                {
                    margin: 10,
                    borderRadius: 20,
                    borderColor: '#ccc',
                    borderStyle: 'solid',
                    borderWidth: 2
                }
            }
        >
            <SignatureCanvas
                ref={(ref) => {setRefCanvas(ref)}}
                penColor={'blue'}
                canvasProps={
                    {
                        width: 500,
                        height: 500,
                        className: 'sigCanvas'
                    }
            } />
        </div>
    )
}

export default FirmaCanvas
