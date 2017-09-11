Ext.define('Infosys_web.store.Cargadteproveedores', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Cargadteproveedores',
    autoLoad: true,
    pageSize: 17,
    
    proxy: {
        type: 'ajax',
        api: {
            //create: preurl + 'cuentacorriente/save', 
            read: preurl + 'facturas/dteproveegetAll',
            //update: preurl + 'cuentacorriente/update'
            //destroy: 'php/deletaContacto.php'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'data'
        }
    }
});