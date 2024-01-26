import AddAlloy from "../components/AlloysPage/AddAlloy/AddAlloy";
import AlloysList from "../components/AlloysPage/AlloysList/AlloysList";

function AlloysPage () {
    return(
        <div>
            <AlloysList></AlloysList>
            <AddAlloy></AddAlloy>
        </div>
    );
}

export default AlloysPage;