const Layout = require('./../modals/LayoutModel');

const saveLayout = async (req, res) => {
    let { email, playListData : structure } = req.body;
    structure = JSON.stringify(structure);
    console.log(email , structure);
    try {
        let layout = await Layout.findOne({ email });

        if (layout) {
            layout.structure =  structure;
            await layout.save();
         return  res.status(200).json({ message: 'Layout updated successfully' });
         
        } else {
            layout = await   Layout({ email, structure });
            await layout.save();
            return res.status(201).json({ message: 'Layout saved successfully' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const loadLayout = async (req, res) => {
    const { email} = req.body;
    try{

        let layout = await Layout.findOne({ email });

        if (layout) {
            return res.status(200).json(layout);
        } else {
            return res.status(404).json({ message: 'Layout doesn\'t exist' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = { loadLayout , saveLayout };  

