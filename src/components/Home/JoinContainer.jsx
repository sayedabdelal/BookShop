import JoinContent from "./JoinContent";

function JoinContainer({ joinImage }) { 
    return ( 
      <section className="join section">
            <div className="join__container">
                <img src={joinImage} alt="image" className="join__bg" />
                    <JoinContent />
            </div>
      </section>
    )
  }

export default JoinContainer;