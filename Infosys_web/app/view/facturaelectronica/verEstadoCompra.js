Ext.define('Infosys_web.view.facturaelectronica.verEstadoCompra' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.verestadocompra',
    
    title : 'Estado DTE',
    autoHeight: false,

    autoShow: true,
    width: 800,
    height: 300,
    initComponent: function() {
        me = this;
        var idcompra = me.idcompra;
        estado_envio_dte = "";
        estado_dte = "";

        var estado_dte = Ext.create('Ext.data.Store', {
            fields: ['value', 'nombre'],
            data : [
                {"value":'0', "nombre":"DTE ACEPTADO OK"},
                {"value":'1', "nombre":"DTE ACEPTADO CON DISCREPANCIA"},
                {"value":'2', "nombre":"DTE RECHAZADO"}
            ]
        });        

        response_datos = Ext.Ajax.request({
        async: false,
        url: preurl + 'facturas/get_provee_by_id/'+idcompra});
        var obj_datos = Ext.decode(response_datos.responseText);
        console.log(obj_datos);
        if(obj_datos.length == 0){
            var razon_social = "";
            var rut_emisor = "";
            var email = "";
            var dte = "";
            var acuse_enviorecibos = "";

        }else{
            var razon_social = obj_datos.razon_social;
            var rut_emisor = obj_datos.rutemisor+'-'+obj_datos.dvemisor;
            var email = obj_datos.mail;
            var url_envio_recibos = preurl + 'facturas/ver_dte_proveedor/3/'+idcompra;
            var url_recepciondte = preurl + 'facturas/ver_dte_proveedor/1/'+idcompra;
            var url_resultadodte = preurl + 'facturas/ver_dte_proveedor/2/'+idcompra;
            var url = preurl + 'facturas/ver_dte_proveedor/'+idcompra;
            var url_image = preurl_js + 'images/xml-icon.png';
            var dte = '<a href="' + url + '" target="_blank"><img src="' + url_image + '" width="16" height="16"></a>';
            //var acuse_enviorecibos = '<a href="' + url_envio_recibos + '" target="_blank"><img src="' + url_image + '" width="16" height="16"></a>';
            var acuse_enviorecibos = obj_datos.arch_env_rec == null ? '<a href="#" ><img src="' + url_image + '" width="16" height="16"></a>' : '<a href="' + url_envio_recibos + '" target="_blank"><img src="' + url_image + '" width="16" height="16"></a>';
            var acuse_recepciondte = obj_datos.arch_rec_dte == null ? '<a href="#" ><img src="' + url_image + '" width="16" height="16"></a>' : '<a href="' + url_recepciondte + '" target="_blank"><img src="' + url_image + '" width="16" height="16"></a>';
            var acuse_resultadodte = obj_datos.arch_res_dte == null ? '<a href="#" ><img src="' + url_image + '" width="16" height="16"></a>' : '<a href="' + url_resultadodte + '" target="_blank"><img src="' + url_image + '" width="16" height="16"></a>';

        }


       /* if(trackid == ""){
            var estado_envio_dte = "N/A";

        }else if(trackid == "0"){
            var estado_envio_dte = "No Enviado";
        }else{
            response_envio = Ext.Ajax.request({
            async: false,
            url: preurl + 'facturas/estado_envio_dte/'+idfactura});
            var obj_envio = Ext.decode(response_envio.responseText);
            var cod_envio = obj_envio.codigo == -11 ? 'Error' : obj_envio.codigo
            var estado_envio_dte = obj_envio.error ? obj_envio.message : cod_envio + " - " + obj_envio.glosa;
        }
*/

        /*    response_estado = Ext.Ajax.request({
            async: false,
            waitMsg    :    'Processing your request',
            url: preurl + 'facturas/estado_dte/'+idfactura});
            var obj_estado = Ext.decode(response_estado.responseText);
            var estado_dte = obj_estado.error ? obj_estado.message : obj_estado.glosa_estado + " - " + obj_estado.glosa_err;   */   

        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                frame: false,
                style: 'background-color: #fff;',
                waitMsgTarget: true, 
                //icon: 'images/download-icon.png',  // Use a URL in the icon config
                viewConfig:{
                    loadingCls: 'images/download-icon.png'
                },                
                items: [
                    {
                        xtype: 'displayfield',
                        itemId : 'razon_social',
                        fieldLabel : 'Raz&oacute;n Social',
                        labelStyle: ' font-weight:bold',
                        //fieldStyle: 'font-weight:bold',
                        value : razon_social,
                        labelWidth: 200,
                    
                    },   
                    {
                        xtype: 'displayfield',
                        itemId : 'rut_emisor',
                        fieldLabel : 'Rut Emisor',
                        labelStyle: ' font-weight:bold',
                        value : rut_emisor,
                        labelWidth: 200,
                    
                    }, {
                        xtype: 'displayfield',
                        itemId : 'email',
                        fieldLabel : 'Email',
                        labelStyle: ' font-weight:bold',
                        value : email,
                        labelWidth: 200,
                    
                    }, {
                        xtype: 'displayfield',
                        itemId : 'dte',
                        fieldLabel : 'DTE Compra',
                        labelStyle: ' font-weight:bold',
                        value : dte,
                        labelWidth: 200,
                    
                    }, {
                        xtype: 'displayfield',
                        itemId : 'acuse_enviorecibos',
                        fieldLabel : 'Acuse Envio Recibos',
                        labelStyle: ' font-weight:bold',
                        value : acuse_enviorecibos,
                        disabled : obj_datos.arch_env_rec == null ? true : false,
                        labelWidth: 200,
                    
                    }, {
                        xtype: 'displayfield',
                        itemId : 'acuse_recepciondte',
                        fieldLabel : 'Acuse Recepci&oacute;n DTE',
                        labelStyle: ' font-weight:bold',
                        value : acuse_recepciondte,
                        disabled :  obj_datos.arch_rec_dte == null ? true : false,
                        labelWidth: 200,
                    
                    }, {
                        xtype: 'displayfield',
                        itemId : 'acuse_resultadodte',
                        fieldLabel : 'Acuse Resultado DTE',
                        labelStyle: ' font-weight:bold',
                        value : acuse_resultadodte,
                        disabled :  obj_datos.arch_res_dte == null ? true : false,
                        labelWidth: 200,
                    
                    }, /*{
                        xtype: 'combobox',
                        itemId : 'estado_dte',
                        fieldLabel : 'Estado',
                        labelStyle: ' font-weight:bold',
                        emptyText : 'Seleccionar',
                        editable: false,
                        store : estado_dte,
                        displayField : 'nombre',
                        valueField : 'value',
                        labelWidth: 200,
                    
                    }  */  
                   /* {
                        xtype: 'displayfield',
                        itemId : 'trackid',
                        fieldLabel : 'Identificador de Env&iacute;o',
                        labelStyle: ' font-weight:bold',
                        value : trackid,
                        labelWidth: 200,
                    
                    },                                                    
                   {
                        xtype: 'displayfield',
                        itemId : 'estado_envio',
                        fieldLabel : 'Estado del Env&iacute;o:',
                        labelStyle: ' font-weight:bold',
                        //fieldStyle: 'font-weight:bold',
                        value : estado_envio_dte,
                        labelWidth: 200,
                    
                    },{
                        xtype: 'displayfield',
                        itemId : 'estado_dte',
                        fieldLabel : 'Estado del DTE:',
                        labelStyle: ' font-weight:bold',
                        //fieldStyle: 'font-weight:bold',
                        value : estado_dte,
                        labelWidth: 200,
                    },
                    {
                        xtype: 'numberfield',
                        itemId : 'idfactura',
                        fieldLabel : '',
                        labelStyle: ' font-weight:bold',
                        //fieldStyle: 'font-weight:bold',
                        value : idfactura,
                        hidden: true
                    }*/

                    {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: [{
                            iconCls: 'icon-upload',
                            text: 'Generar Acuses de Recibo',
                            itemId : 'genera_acuse',
                            disabled : obj_datos.procesado == 'Y' ? true : false,                            
                            handler: function() {
                                var form = this.up('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url: preurl + 'facturas/genera_acuse_recibo/' + idcompra,
                                        waitMsg: 'Generando...',
                                        success: function(fp, o) {
                                            Ext.Msg.alert('Atención', o.result.message);
                                            //me.down('#trackid').setValue(o.result.trackid);  

                                            //var estado_dte = o.result.trackid != 0 ? "DTE Recibido - Revisi&oacute;n en proceso" : "DTE No Recibido.  Documento No Recibido por el SII";

                                            //me.down('#estado_dte').setValue(estado_dte);

                                            //if(o.result.trackid != 0){
                                                var acuse_enviorecibos = '<a href="' + url_envio_recibos + '" target="_blank"><img src="' + url_image + '" width="16" height="16"></a>';
                                                var acuse_recepciondte = '<a href="' + url_recepciondte + '" target="_blank"><img src="' + url_image + '" width="16" height="16"></a>';
                                                var acuse_resultadodte = '<a href="' + url_resultadodte + '" target="_blank"><img src="' + url_image + '" width="16" height="16"></a>';
                                                
                                                me.down('#acuse_enviorecibos').setDisabled(false);    
                                                me.down('#acuse_enviorecibos').setValue(acuse_enviorecibos);    

                                                me.down('#acuse_recepciondte').setDisabled(false);    
                                                me.down('#acuse_recepciondte').setValue(acuse_recepciondte);    

                                                me.down('#acuse_resultadodte').setDisabled(false);    
                                                me.down('#acuse_resultadodte').setValue(acuse_resultadodte);    


                                                me.down('#sent_button').setDisabled(false);    
                                                me.down('#genera_acuse').setDisabled(true);  
                                            //}   


                                        },
                                        error: function(fp, o){
                                            Ext.Msg.alert('Atención', o.result.message);

                                        }
                                    });
                                }
                            }                            
                        },{
                            iconCls: 'icon-upload',
                            text: 'Enviar a SII',
                            itemId : 'sent_button',
                            disabled : obj_datos.fecenvio == null && obj_datos.procesado == 'Y' ? false : true,                                  
                            handler: function() {
                                var form = this.up('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url: preurl + 'facturas/envio_sii',
                                        waitMsg: 'Enviando...',
                                        success: function(fp, o) {
                                            Ext.Msg.alert('Atención', o.result.message);
                                            me.down('#trackid').setValue(o.result.trackid);  

                                            var estado_dte = o.result.trackid != 0 ? "DTE Recibido - Revisi&oacute;n en proceso" : "DTE No Recibido.  Documento No Recibido por el SII";

                                            me.down('#estado_dte').setValue(estado_dte);

                                            if(o.result.trackid != 0){
                                                me.down('#sent_button').setDisabled(true);    
                                            }   


                                        },
                                        error: function(fp, o){
                                            Ext.Msg.alert('Atención', o.result.message);

                                        }
                                    });
                                }
                            }                            
                        },
                        {
                            iconCls: 'icon-save',
                            text: 'Actualizar Identificador Env&iacute;o',
                            disabled : true,
                            handler: function() {
                                var form = this.up('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url: preurl + 'facturas/put_trackid',
                                        waitMsg: 'Enviando...',
                                        success: function(fp, o) {

                                            Ext.Msg.alert('Atención', o.result.message);
                                            this.close;

                                        }
                                    });
                                }
                            }                            
                        },
                        {
                            iconCls: 'icon-email',
                            text: 'Env&iacute;o DTE email',
                            disabled : true, 
                            handler: function() {
                                var form = this.up('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url: preurl + 'facturas/envio_mail_dte',
                                        waitMsg: 'Enviando...',
                                        success: function(fp, o) {

                                            Ext.Msg.alert('Atención', o.result.message);
                                            this.close;

                                        },
                                        error: function(fp, o){
                                            Ext.Msg.alert('Atención', o.result.message);

                                        }
                                    });
                                }
                            }                            
                        }                        ]
                    }                   
                ],
                /*listeners:{
                    afterlayout: function(form, layout, eOpts){
                        form.getForm().load({waitMsg:'Cargando'});                          
                        me = this;
                       // console.log(me.down('#idfactura').getValue());
                        
                        var idfactura = me.down('#idfactura').getValue();
                        response_envio = Ext.Ajax.request({
                        async: false,
                        url: preurl + 'facturas/estado_envio_dte/'+idfactura});
                        var obj_envio = Ext.decode(response_envio.responseText);
                        var estado_envio_dte = obj_envio.error ? obj_envio.message : obj_envio.codigo + " - " + obj_envio.glosa;

                        //me.down('#estado_envio').setValue(estado_envio_dte); 
                        
                    }
                }*/
            }
        ];
        
        this.callParent(arguments);
    }
});
