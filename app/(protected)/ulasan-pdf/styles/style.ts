import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontFamily: "Helvetica",
      fontSize: 12,
    },
    header: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 20,
    },
    table: {
        
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        marginBottom: 10,
      },
      tableRow: {
        flexDirection: "row",
      },
      tableCellHeader: {
        flex: 1,
        padding: 8,
        textAlign: "left",
        fontWeight: "bold",
        borderRightWidth: 1,
        borderRightStyle: "solid",
        borderRightColor: "#000",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "#000",
      },
      tableCell: {
        flex: 1,
        padding: 8,
        textAlign: "left",
        borderRightWidth: 1,
        borderRightStyle: "solid",
        borderRightColor: "#000",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "#000",
      },
      lastCell: {
        borderRightWidth: 0, // Remove right border for the last column
      },
    mapImage: {
      width: "100%",
      height: "auto",
      marginBottom: 20,
    },
  });

  export default styles;