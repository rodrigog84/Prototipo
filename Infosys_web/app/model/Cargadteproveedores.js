
Ext.define('Infosys_web.model.Cargadteproveedores', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
    	{name: 'num'},
    	{name: 'razon_social'},
        {name: 'rutemisor'},
    	{name: 'mail'},
    	{name: 'fecemision'},
    	{name: 'fecenvio'},
    	{name: 'created_at'},
    ]
});