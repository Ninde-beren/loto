import {db} from "../db";

const GetParty = async () => {

    // Add the new friend!
    const party: any = await db.table('party').get(1);

    if (!party) return

    [party.params] = await Promise.all([
        db.params.get(1),
    ]);

    localStorage.setItem('party', JSON.stringify(party))
    return party
}
export default GetParty