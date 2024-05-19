import { View, Text, Button, FlatList, Modal, TouchableOpacity } from 'react-native';
import UpdateCellServiceItem from './UpdateCellServiceItem.js';


const CellServiceDataList= ({editedData, cellServiceView, toggleCellServiceView, handleCellularDataChange, deleteCellCarrierItem, styles }) => {

  const rvSiteName = editedData.SiteName;

    return (
      <View>
        <FlatList
        data={editedData.CellService}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Button
              color='#F5F6E4'
              title={`Update ${item.Carrier}`}
              onPress={() => toggleCellServiceView(index)}
              accessibilityLabel={`Show ${item.Carrier} Service Data`}
            />
            {cellServiceView === index && (
              <Modal
              animationType="slide"
              transparent={true}
              visible={cellServiceView === index}
              onRequestClose={() => {
                toggleCellServiceView(!cellServiceView);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <UpdateCellServiceItem 
                  startCellularData={item}
                  rvSiteName={rvSiteName}
                  onSave={(updateCellServiceItem) => 
                    handleCellularDataChange(index, updateCellServiceItem)}
                    onDelete={(updateCellServiceItem) => 
                      deleteCellCarrierItem(index, updateCellServiceItem)
                    }
                     />
                    <TouchableOpacity style={styles.closeButton} onPress={toggleCellServiceView}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
              </View>

            </Modal>
            )}

                          
          </View>
        )}
        scrollEnabled={false}
      />
      
      {editedData.CellService.length === 0 && 
        <Text
          style={[styles.textRVSite, {marginLeft: 10}]}>
          (Cell Service Data Not Available)
        </Text>}
                                 
      </View>
      
    );
};
  
export default CellServiceDataList;